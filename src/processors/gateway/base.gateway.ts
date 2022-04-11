/*
 * @FilePath: /GS-server/src/processors/gateway/base.gateway.ts
 * @author: Wibus
 * @Date: 2022-04-10 16:33:57
 * @LastEditors: Wibus
 * @LastEditTime: 2022-04-10 16:33:57
 * Coding With IU
 */
import { Socket } from 'socket.io'
import { EventTypes } from './events.types'

export abstract class BaseGateway {
  public gatewayMessageFormat(type: EventTypes, message: any, code?: number) {
    return {
      type,
      data: message,
      code,
    }
  }

  handleDisconnect(client: Socket) {
    client.send(
      this.gatewayMessageFormat(EventTypes.GATEWAY_CONNECT, 'WebSocket 断开'),
    )
  }
  handleConnect(client: Socket) {
    client.send(
      this.gatewayMessageFormat(EventTypes.GATEWAY_CONNECT, 'WebSocket 已连接'),
    )
  }
}
