export type TerrorMessages = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages?: TerrorMessages;
  data?: [];
};
