import {MethodMap} from 'lib-sockets/src/lib/interfaces';

export interface QrClient extends MethodMap {
    'GenerateQrUrl': (url: string) => void;
}
