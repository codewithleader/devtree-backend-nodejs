import colors from 'colors';
import server from '@app/server';
import { envs } from '@src/app/config';

const PORT: number = envs.PORT;

server.listen(PORT, () => {
  console.log(colors.blue.bold(`Server is running on port ${PORT}`));
});
