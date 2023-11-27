export interface IError {
  status: number;
  message: string;
}
export const PARTNER_NOT_FOUND_ERROR: IError = {
  status: 404,
  message: "Partner not found",
};
export const SERVER_ERROR: IError = { status: 500, message: "Server error" };

export const PARTNER_EXISTS_ERROR: IError = {
  status: 409,
  message: "Partner already exists",
};
export const INVALID_LOCATION_ERROR: IError = {
  status: 400,
  message: "Invalid location",
};
