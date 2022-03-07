import { ApiProperty } from "@nestjs/swagger";

/*
 * @FilePath: /GS-server/src/shared/dto/create-comments-dto.ts
 * @author: Wibus
 * @Date: 2021-10-04 22:04:15
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-13 17:14:47
 * Coding With IU
 */
export class CreateCommentsDto {
  cid: number; //Comments id

  @ApiProperty()
    type: string; //choose `post` or `page`

  @ApiProperty()
    path: string;

  post: string; //only ID

  @ApiProperty()
    content: string; //Comments content

  createTime: number;

  @ApiProperty()
    author: string;

  @ApiProperty()
    owner: string;

  @ApiProperty()
    isOwner?: number;

  @ApiProperty()
    email: string;

  @ApiProperty()
    url?: string = null;

  @ApiProperty()
    key?: string = null;

  @ApiProperty()
    hasChild?: number;

  @ApiProperty()
    ipAddress?: string = null;

  @ApiProperty()
    userAgent?: string = null;

  @ApiProperty()
    state: number; // 0 need checked, 1 push, 2 shit message
}