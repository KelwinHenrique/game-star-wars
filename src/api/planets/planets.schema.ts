import * as mongoose from 'mongoose';

export const PlanetSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ground: {
      type: String,
      required: true,
    },
    weather: {
      type: String,
      required: true,
    },
    films: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export class Planet extends mongoose.Document {
  name: string;
  ground: string;
  weather: string;
  films: number;
}
