const ENDPOINT = 'https://www.youtube.com/watch?v=';
const PATH_INPUT = './tmp';
const PATH_OUTPUT = './public/audio';
const EXT = 'mp3';

const path = require('path');
const exec = require('./exec');

const Commands = {
  inputPath  : (token, filePath = PATH_INPUT)  => path.resolve(filePath, token),
  outputPath : (token, filePath = PATH_OUTPUT) => path.resolve(filePath, token),
  extract: async(token) => {
    return {
      result: await exec(
        'youtube-dl', [
          '--verbose',
          '--extract-audio',
          `--audio-format ${EXT}`,
          `-o "${Commands.inputPath(token)}.%(ext)s"`,
          `${ENDPOINT}${token}`
        ]
      )
    };
  },
  reverse: async(token) => {
    const inputPath = Commands.inputPath(token);
    const outputPath = Commands.outputPath(token + '_r');

    return await exec(
      'ffmpeg', [
        `-i ${inputPath}.${EXT}`,
        `-vf reverse -af areverse ${outputPath}.${EXT}`
      ]
    );
  }
};

module.exports = Commands;