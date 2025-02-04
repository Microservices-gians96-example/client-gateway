import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();
        if (rpcError.toString().includes('Empty response')) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1),
                timestamp: new Date().toISOString()
            })
        }
        if (typeof rpcError === 'object' &&
            'statusCode' in rpcError &&
            'message' in rpcError) {

            const statusCode = isNaN(+rpcError.statusCode) ? HttpStatus.BAD_REQUEST : +rpcError.statusCode;
            return response.status(statusCode).json({ ...rpcError, timestamp: new Date().toISOString() });
        }

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            message: rpcError,
        });


    }
}