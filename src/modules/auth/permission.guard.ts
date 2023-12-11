import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const userTokenId = this.getUserIdFromToken(token);
      const userRequestToken = request.user.id;

      return userTokenId === userRequestToken;
    }

    return false;
  }

  private getUserIdFromToken(token: string): number {
    const decodedToken: any = this.jwtService.decode(token);
    return decodedToken;
  }
}
