import { Controller, forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './localStrategy';

@Module({
  imports: [
    // forwardRef(() => UserModule),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Replace with a secure key
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
