import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

let ids = new Map<string, number>([]);

let date: number = new Date().getDate();

@Injectable()
export class RequestLimitGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const id: string = request.params.id;
    const currentDate: number = new Date().getDate();

    if (currentDate === date) {
      const valueInStorage: number = ids.get(id);
      if (
        valueInStorage &&
        valueInStorage >= Number(process.env.REQUEST_LIMIT)
      ) {
        return false;
      }
      if (valueInStorage) {
        ids.set(id, valueInStorage + 1);
        return true;
      }
      ids.set(id, 1);
      return true;
    } else {
      ids = new Map<string, number>([]);
      ids.set(id, 1);
      date = new Date().getDate();
    }
    return true;
  }
}
