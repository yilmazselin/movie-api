const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

//tüm filmleri listelemek için


router.get('/', (req, res) => {

    const promise = Movie.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//top 10 film listesi yazdırmak için ve imdb puan sıralaması    (bir alttakide get isteği olduğu için çakıştı o nedenle o kodun üstüne aldık ve ezdik)

router.get('/top10', (req, res) => {

    const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


//id si verilen film getiren kod
//gönderilen id params değerinin yerine geçiyor

router.get('/:movie_id', (req, res, next) => {

    const promise = Movie.findById(req.params.movie_id);
    promise.then((movie) => {
        if (!movie)
            next({ message: 'The Movie Was Not Found', code: 99 });
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })

});


//film güncellemek için 

router.put('/:movie_id', (req, res, next) => {

    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true   //direk güncellenen veriyi dönsün diye new kullandık
        }
    );
    promise.then((movie) => {
        if (!movie)
            next({ message: 'The Movie Was Not Found', code: 99 });
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })

});

//fimleri post etmek için

router.post('/', (req, res, next) => {

    // const { title, imdb_score, category, country, year } = req.body;


    // modelimizde olan şekilde nesne türetiyoruz

    const movie = new Movie(req.body); // şemada olan bilgileri tek tek obje oluşturarak göndermek yerine data göndermek için kısayol

    // veri tabanına kaydetmek için

    // data veri tabanına kaydedildikten sonra ilgili kayıt neyse onu döner.

    movie.save((err, data) => {
        if (err)
            res.json(err);
        res.json(data);
    });

});

//film silmek için (tüm kodlar aynı sadece findByIdAndRemove yaptık)

router.delete('/:movie_id', (req, res, next) => {

    const promise = Movie.findByIdAndRemove(req.params.movie_id);
    promise.then((movie) => {
        if (!movie)
            next({ message: 'The Movie Was Not Found', code: 99 });

        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })

});

//verilen 2 yıl arasındaki filmleri listeleme (between)

router.get('/between/:start_year/:end_year', (req, res) => {

    const { start_year, end_year } = req.params;  //paramsla year datasını aldık
    const promise = Movie.find(
        {
            year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }  // $gte: büyük veya eşit  $lte küçük veya eşit demek. sonlarına e yazmazsak eşit olan değerleri getirmez
        }

    );
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});






module.exports = router;