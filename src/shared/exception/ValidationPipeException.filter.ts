import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from './ErrorResponse';

@Catch(BadRequestException)
export class ValidationPipeExceptionFilter implements ExceptionFilter<BadRequestException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: (exception.getResponse() as ErrorResponse).message,
    });
  }
}
