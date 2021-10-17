import { IPublicInfo } from 'models/user';
import { ID } from './Common';
import { IMessage } from './message';

export interface IChatRoom {
    _id: ID
    composing: IPublicInfo[]
    members: IPublicInfo[]
    messages: IMessage[]
}
