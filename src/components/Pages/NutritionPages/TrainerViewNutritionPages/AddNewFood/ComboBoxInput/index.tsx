import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

export interface IComboboxInput {
  categories: FoodCategory[];
  setSelectedFoodCategory: React.Dispatch<
    React.SetStateAction<FoodCategory | null>
  >;
  selectedCategory: FoodCategory | null;
}
const ComboboxInput: FC<IComboboxInput> = ({
  categories,
  selectedCategory,
  setSelectedFoodCategory,
}) => {
  const [query, setQuery] = useState<string>("");
  const { setValue } = useFormContext();

  const filteredSuperFunds: FoodCategory[] =
    query === ""
      ? categories
      : categories.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedCategory}
      onChange={(value) => {
        setSelectedFoodCategory(value);
        setValue("food_category", value?.id);
      }}
    >
      <div className="relative sm:max-w-xs">
        <Combobox.Input<FoodCategory>
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(category) => category?.name}
          placeholder="eg. Protein"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredSuperFunds?.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredSuperFunds.map((category, idx) => (
              <Combobox.Option
                key={idx}
                value={category}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={clsx(
                          "truncate",
                          selected && "font-semibold",
                        )}
                      >
                        {category.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default ComboboxInput;
