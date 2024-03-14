import readline from 'readline';

/**
 * 命令行交互
 * @param query
 * @returns
 */
const question = (query: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>(resolve => {
    rl.question(query, answer => {
      resolve(answer);
      rl.close();
    });
  });
};

export default question;
