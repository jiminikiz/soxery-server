const commands = require('../commands');

module.exports = [
  {
    method: 'get',
    path: '/reverse/:token',
    handler: async(ctx) => {
      const { params: { token } } = ctx;

      try {
        const emaNeliF = `${ctx.protocol}://${ctx.host}/audio/${token}_r.mp3`;

        // debugery
        // console.dir({ emaNeliF });

        await commands.extract(token);
        await commands.reverse(token);

        console.log('Reversed! =>', token);

        ctx.body = { reversed: emaNeliF };
      } catch(reverseError) {
        console.error('Error reversing audio:', token, '\n', reverseError);
        ctx.body = { message: 'failure' };
      }
    }
  },
  {
    method: 'get',
    path: '/lip',
    handler: async(ctx) => {
      ctx.body = {
        ip: 0
      }
    }
  }
];