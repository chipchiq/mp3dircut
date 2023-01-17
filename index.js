
const {readFileSync, writeFileSync, watchFile, existsSync, readdirSync} = require('fs');
const { exec } = require('child_process');

const convertToSeconds = (str) => {
	const s = +str.slice(-2) || 0
	const m = +str.slice(-4,-2) || 0
	const h = +str.slice(-6,-4) || 0
	return 60 * 60 * h + 60 * m + s
}
const SRC = `${__dirname}/src`
const DIST = `${__dirname}/dist`


const cut = (f,start,end) => {
	[SRC, DIST].map(p => existsSync(p) || exec(`mkdir ${p}`))
	const files = readdirSync(SRC)
	files.map(f => {
		if (!f.includes('.mp3')) return
		const m = f.match(/(.+)\.(\d+)-(\d+)(\.mp3)$/)
		if (!m) return

		const [src, name, s, e, ext] = m
		const start = convertToSeconds(s)
		const end = convertToSeconds(e)
		const dur = end - start
		const target = `${DIST}/${name}.${start}.${dur}s${ext}`
		exec(`ffmpeg -ss ${start} -t ${end-start} -i ${SRC}/${src} -acodec mp3 ${target}`, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.error(`stderr: ${stderr}`);
		})
	})
}

cut()
