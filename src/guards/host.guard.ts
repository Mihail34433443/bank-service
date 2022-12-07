import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class HostGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const host: string = request.headers.host;
    const whiteHosts = process.env.WHITE_HOSTS.split(' ');

    if (whiteHosts.includes(host)) {
      return true;
    }
    return false;
  }
}
