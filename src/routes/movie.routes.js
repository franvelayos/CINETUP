import { Router } from "express";
import { Movie } from "../entities/Movie.js";
import { ERROR_CODE } from "../errorCodes.js";

const router = Router();

router.get("/movie", async (_, res) => {
    const movies = await Movie.findAll()
    res.json(movies);
});

router.get("/movie/:id", async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie)
        return res.status(ERROR_CODE.NOT_FOUND).send({ message: "Película no encontrada" });

    res.json(movie);
});

router.post("/movie", async (req, res) => {
    const { title, director, category, summary, imageUrl, duration, language, isAvailable } = req.body;

// Title and director are required
    if (!title || !director)
        return res.status(ERROR_CODE.BAD_REQUEST).send({ message: "Título y Director son campos requeridos" });

    const newMovie = await Movie.create({
        title,
        director,
        category,
        summary,
        imageUrl,
        duration,
        language, 
        isAvailable
    })
    res.json(newMovie)
});

router.put("/movie/:id", async (req, res) => {
    const { id } = req.params;

    const { title, director, category, summary, imageUrl, duration, language, isAvailable } = req.body;

    // Title and director are required
    if (!title || !director)
        return res.status(ERROR_CODE.BAD_REQUEST).send({ message: "Título y director son campos requeridos" });

    const movie = await Movie.findByPk(id);

    await movie.update({
        title,
        director,
        category,
        summary,
        imageUrl,
        duration,
        language, 
        isAvailable
    });

    await movie.save();

    res.send(movie);
});

router.delete("/movie/:id", async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    if (!movie)
        return res.status(ERROR_CODE.NOT_FOUND).send({ message: "Película no encontrada" });

    await movie.destroy();

    res.send(`Borrando película con ID ${id}`);
})

export default router;