import server from '@app/server';
import { envs } from '@app/config/envs';

const PORT = envs.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
