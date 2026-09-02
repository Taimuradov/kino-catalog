const movies = [
  {
    id: 1,
    title: "Побег из Шоушенка",
    year: 1994,
    genre: "Драма",
    rating: 8.7,
    poster:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
  {
    id: 2,
    title: "Интерстеллар",
    year: 2014,
    genre: "Фантастика",
    rating: 8.6,
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 3,
    title: "Начало",
    year: 2010,
    genre: "Фантастика",
    rating: 8.8,
    poster:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 4,
    title: "Темный рыцарь",
    year: 2008,
    genre: "Боевик",
    rating: 9.0,
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 5,
    title: "Форрест Гамп",
    year: 1994,
    genre: "Драма",
    rating: 8.5,
    poster:
      "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
  {
    id: 6,
    title: "Матрица",
    year: 1999,
    genre: "Фантастика",
    rating: 8.7,
    poster:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 7,
    title: "Властелин колец: Братство кольца",
    year: 2001,
    genre: "Фэнтези",
    rating: 8.8,
    poster:
      "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkblc3x3Y.jpg",
  },
  {
    id: 8,
    title: "Властелин колец: Две крепости",
    year: 2002,
    genre: "Фэнтези",
    rating: 8.7,
    poster:
      "https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYNJ.jpg",
  },
  {
    id: 9,
    title: "Властелин колец: Возвращение короля",
    year: 2003,
    genre: "Фэнтези",
    rating: 8.9,
    poster:
      "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  },
  {
    id: 10,
    title: "Гладиатор",
    year: 2000,
    genre: "Боевик",
    rating: 8.5,
    poster:
      "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  },
  {
    id: 11,
    title: "Джокер",
    year: 2019,
    genre: "Драма",
    rating: 8.4,
    poster:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 12,
    title: "Остров проклятых",
    year: 2010,
    genre: "Триллер",
    rating: 8.2,
    poster:
      "https://image.tmdb.org/t/p/w500/4GDy0PH7M7X8x9V3E6b3r8E5Y7.jpg",
  },
  {
    id: 13,
    title: "Зеленая миля",
    year: 1999,
    genre: "Драма",
    rating: 8.6,
    poster:
      "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEpQFjQJd7Y.jpg",
  },
  {
    id: 14,
    title: "Крестный отец",
    year: 1972,
    genre: "Криминал",
    rating: 9.2,
    poster:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
  {
    id: 15,
    title: "Пираты Карибского моря",
    year: 2003,
    genre: "Приключения",
    rating: 8.1,
    poster:
      "https://image.tmdb.org/t/p/w500/z8onk7LV9Mmw6zKz4hT6pzzvmvl.jpg",
  },
  {
    id: 16,
    title: "Король Лев",
    year: 1994,
    genre: "Мультфильм",
    rating: 8.5,
    poster:
      "https://image.tmdb.org/t/p/w500/2rH3bLk3K8f9z8W8H3z8x0KQx4L.jpg",
  },
  {
    id: 17,
    title: "ВАЛЛ·И",
    year: 2008,
    genre: "Мультфильм",
    rating: 8.4,
    poster:
      "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
  },
  {
    id: 18,
    title: "Вверх",
    year: 2009,
    genre: "Мультфильм",
    rating: 8.3,
    poster:
      "https://image.tmdb.org/t/p/w500/mFvoEwSfLqbcWwC6zD7QZx4J8wB.jpg",
  },
  {
    id: 19,
    title: "Как приручить дракона",
    year: 2010,
    genre: "Мультфильм",
    rating: 8.2,
    poster:
      "https://image.tmdb.org/t/p/w500/ygGmAO60t8GyqLGS9QqQ9y8v0Vt.jpg",
  },
  {
    id: 20,
    title: "История игрушек",
    year: 1995,
    genre: "Мультфильм",
    rating: 8.3,
    poster:
      "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
  },
  {
    id: 21,
    title: "Головоломка",
    year: 2015,
    genre: "Мультфильм",
    rating: 8.1,
    poster:
      "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU8x1m3Wf4zZ3v.jpg",
  },
  {
    id: 22,
    title: "Человек-паук: Через вселенные",
    year: 2018,
    genre: "Мультфильм",
    rating: 8.4,
    poster:
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  },
  {
    id: 23,
    title: "Коко",
    year: 2017,
    genre: "Мультфильм",
    rating: 8.4,
    poster:
      "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
  },
  {
    id: 24,
    title: "Рататуй",
    year: 2007,
    genre: "Мультфильм",
    rating: 8.1,
    poster:
      "https://image.tmdb.org/t/p/w500/npAlQe9K2y6M0v5xZ4h1Qp9w3.jpg",
  },
  {
    id: 25,
    title: "Зверополис",
    year: 2016,
    genre: "Мультфильм",
    rating: 8.0,
    poster:
      "https://image.tmdb.org/t/p/w500/hlK0x1f3k3x6k2n9q7x5m4w8.jpg",
  },
]

export default movies