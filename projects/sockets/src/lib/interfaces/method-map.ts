export interface MethodMap {
    [methodName: string]: (...args: any[]) => void;
}
