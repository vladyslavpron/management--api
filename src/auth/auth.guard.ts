import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('user is unauthorized');
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException('user is unauthorized');
    }
  }
}
