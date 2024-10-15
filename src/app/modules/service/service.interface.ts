export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  category:
    | "basic wash"
    | "interior detailing"
    | "exterior shine"
    | "engine cleaning"
    | "headlight restoration"
    | "full service";
  isDeleted: boolean;
};
