import React from "react";
import "./Card.css";
export default function Card({ data }) {
  const { name, height, weight, abilities, moves, sprites, types } = data;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg main">
      <div className="flex flex-col justify-center  items-center">
        <img src={sprites.front_default} alt="" />
        <div className="font-bold text-2xl text-red-500 mb-2">{name}</div>
        <span>
          {abilities.map((ability, i) => (
            <small
              key={i}
              className="bg-purple-500 rounded-full px-2 py-1 text-sm font-semibold text-white mr-1"
            >
              {ability.ability.name}
            </small>
          ))}
        </span>
      </div>

      <div className="ml-2 text-white">
        <ul className="m-10">
          <li className="mb-2">
            <h5 className="font-bold">height</h5>
            <small>{height}</small>
          </li>
          <li>
            <h5 className="font-bold">Weight</h5>
            <small>{weight}</small>
          </li>
          <li>
            <h5 className="font-bold">Moves</h5>
            <small>{moves[0].move.name}</small>
          </li>
          <li>
            <h5 className="font-bold">Types</h5>
            {types.map((item, i) => (
              <span key={i}>{item.type.name}</span>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
