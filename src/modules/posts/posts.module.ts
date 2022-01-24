import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../category/category.module";
import { CategoryService } from "../category/category.service";
import { PostsController } from "./posts.controller";
import { Posts } from "../../shared/entities/posts.entity";
import { PostsService } from "./posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), CategoryModule],
  providers: [PostsService, CategoryService],
  controllers: [PostsController],
  exports: [TypeOrmModule],
})
export class PostsModule {}
