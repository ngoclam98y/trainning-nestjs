import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }


  /*Login Google*/
  @Get("/login-google")
  authGoogle() {
    return `<p>Login with google <a href="/auth/google"><button>Login</button></a></p>`;
  }

  @Get("/google")
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      success: true,
      user: req.user
    };
  }
  /*End Login google*/


  /*Login Github*/
  @Get("/login-github")
  authGithub() {
    return `<p>Login with google <a href="/auth/github"><button style="width: 200px;height: 40px;">Login</button></a></p>`;
  }

  @Get("/github")
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) { }

  @Get('/github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req) {
    if (!req.user) {
      return 'No user from github';
    }

    return {
      success: true,
      user: req.user
    };
  }
  /*End Login Github*/


}
