import { JwtPayload } from 'jsonwebtoken';
declare interface AppJwtPayload extends JwtPayload {
  sub: string; // This identified as the user.id
  email: string;
}
