import fs from 'fs';

const initEventDrivenApproach = () => {
  const stream = fs.createReadStream('./readable/text.txt', { encoding: 'utf8' });

  // NOTE: alternative variant
  // const stream = fs.createReadStream('./readable/text.txt');
  // stream.setEncoding('utf8');

  stream.on('data', (chunk) => {
    console.log(chunk);
  });
  stream.on('end', () => {
    console.log('[End of file]');
  });
  stream.on('error', (error) => {
    console.log(error.message);
  });
  stream.on('close', () => {
    console.log('[Close file]');
  });
  stream.on('open', () => {
    console.log('[Open file]');
  });
};

const initAsyncIterationApproach = async () => {
  const stream = fs.createReadStream('./video/sample.mp4');

  try {
    for await (const chunk of stream) {
      console.log(chunk);
    }

    console.log('[End of file]');
  } catch (error) {
    console.log(error.message);
  }
};

initAsyncIterationApproach();
