import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./Dto/auth.dto";
import { AuthGuard } from "src/guards/auth.guard";

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() user:AuthDto) {
        return await this.authService.login(user)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('verify')
    async verifyToken( @Req() req: any) {
        console.log(req.headers.authorization.split(' ')[1] ?? '');
        
        return await this.authService.verifyToken(req.headers.authorization.split(' ')[1] ?? '')
    }
}