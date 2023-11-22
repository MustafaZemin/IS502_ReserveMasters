import Link from "next/link";
import React from "react";

const RestaurantItem = (props) => {
  return (
    <Link href={`/${props.slug}`}>
      <div className="grid h-[400px] w-full rounded-lg bg-white p-2 text-center text-black drop-shadow-lg">
        <div className="grid h-[200px] w-full ">
          <img
            src={props.imageUrl}
            alt=""
            className="h-[120px] w-full object-cover"
          />
          <h4 className="font-semibold">{props.name} </h4>
          <p>{props.rating}/10 </p>
          <hr className="w-full border-t-2 border-sec1" />
        </div>
        <div className="grid h-[200px] place-content-between">
          <p className="text-left text-sm text-slate-500">
            {props.shortDescription}
          </p>
          <div className="flex h-[80px] w-full items-center justify-center">
            {props.cuisine}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
