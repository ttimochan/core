/*
 * @FilePath: /nx-core/libs/config/src/config.interface.ts
 * @author: Wibus
 * @Date: 2022-09-08 21:34:16
 * @LastEditors: Wibus
 * @LastEditTime: 2022-09-09 21:12:50
 * Coding With IU
 */

import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { EmailDto, SeoDto, SiteDto, WebhookDto } from './config.dto';

export abstract class ConfigsInterface {
  @Type(() => SeoDto)
  @ValidateNested()
  seo: SeoDto;

  @Type(() => SiteDto)
  @ValidateNested()
  site: SiteDto;

  @Type(() => WebhookDto)
  @ValidateNested()
  webhook: WebhookDto[];

  @Type(() => EmailDto)
  @ValidateNested()
  email: EmailDto;
}

export type ConfigsInterfaceKeys = keyof ConfigsInterface;
