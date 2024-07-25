import client from "../connection";

interface Film {
    id: string;
    title: string;
    original_title: string;
    original_title_romanised: string;
    image: string;
    movie_banner: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    running_time: string;
    rt_score: number;
    people: string[];
    species: string[];
    locations: string[];
    vehicles: string[];
    url: string;
}

const films = async () => await client.db().collection("films");

const getAll = async () => (await films()).find({}).toArray() as unknown as Promise<Film[]>;
const byTitle = async (title: string) => (await films()).find({ title: { $regex: new RegExp(title, "gi") } }).toArray();
const gt = async (rating: string) => (await films()).find({ rt_score: { $gt: Number(rating) } }).toArray();

export default {
    getAll,
    byTitle,
    gt,
};
