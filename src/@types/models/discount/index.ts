export type TDiscount = {
  id: string;
  conditions: string[];
  amount: number;
  information: string;
  discountTypeId: string;
};

export type TNewDiscount = {
  conditions: string[];
  amount: number;
  information: string;
  discountTypeId: string;
};
