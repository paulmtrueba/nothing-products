export interface UseProductType {
    mailSending: boolean;
    status: string;
    fetchMailgun: Function;
    fetchTestMailgun: Function;
    setStatus: Function;
}