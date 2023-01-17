# Requirements
- node
- ffmpeg

# Usage
Example:
```
node index.js
```

# Pattern
Search mp3 files from dir /src
Timings pattern:
```
name.{hhmmss}-{hhmmss}.mp3
```
cut and copy to dir /dist

Example:
```
src/dubstep.13558-13740.mp3
> node index.js
dist/dubstep.5758.102s.mp3
```