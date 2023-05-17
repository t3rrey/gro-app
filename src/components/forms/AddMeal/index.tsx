import FoodSearchBar from "@/components/FoodSearchBar";
import { FoodItem } from "@/lib/types";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import StickyTable from "@/components/StickyTable";

export interface FoodWithQuantity {
  food: FoodItem;
  quantity: number;
  quantityType?:
    | "grams"
    | "ml"
    | "cups"
    | "tablespoons"
    | "teaspoons"
    | "units";
}

const AddMealForm: FC = () => {
  const [mealFoods, setMealFoods] = useState<FoodWithQuantity[]>([]);

  const { register } = useFormContext();

  return (
    <div className="w-full bg-blue-300 rounded-t-lg mt-auto h-2/3">
      <FoodSearchBar mealFoods={mealFoods} setMealFoods={setMealFoods} />
      <StickyTable />
    </div>
  );
};

export default AddMealForm;
