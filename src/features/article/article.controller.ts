import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {

}
