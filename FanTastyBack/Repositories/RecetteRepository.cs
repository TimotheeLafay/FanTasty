using FanTastyBack.Config;
using FanTastyBack.Models;
using FanTastyBack.Repositories.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FanTastyBack.Repositories
{
    public class RecetteRepository : IRecetteRepository
    {
        private readonly IMongoCollection<Recette> _recettes;
        private readonly IIngredientRepository _ingredientRepository;

        public RecetteRepository(IFantastyDatabaseSettings settings, IIngredientRepository ingredientRepository)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _recettes = database.GetCollection<Recette>(settings.RecettesCollectionName);
            _ingredientRepository = ingredientRepository;
        }

        public List<Recette> FindAll()
        {
            List<Recette> recettes = this._recettes.Find(rec => true).ToList();
            for (int i = 0; i < recettes.Count; i++)
            {
                foreach (IngredientRecette ingr in recettes[i].Ingredients)
                {
                    ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
                }
            }
            return recettes;
        }

        public Recette FindById(string id)
        {
            Recette recette = this._recettes.Find(rec => rec.Id == id).FirstOrDefault();
            foreach (IngredientRecette ingr in recette.Ingredients)
            {
                ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
            }
            return recette;
        }

        public Recette FindByName(string nom)
        {
            Recette recette = this._recettes.Find(rec => rec.Nom == nom).FirstOrDefault();
            foreach (IngredientRecette ingr in recette.Ingredients)
            {
                ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
            }
            return recette;
        }

        public List<Recette> FindByUnivers(string univers)
        {
            List<Recette> recettes = this._recettes.AsQueryable<Recette>()
                .Where(x => x.Univers.ToLower() == univers.ToLower())
                .ToList();
           
            for (int i = 0; i < recettes.Count; i++)
            {
                foreach (IngredientRecette ingr in recettes[i].Ingredients)
                {
                    ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
                }
            }
            return recettes;
        }

        public List<Recette> FindByAuteur(string auteur)
        {
            List<Recette> recettes = this._recettes.Find(rec => rec.Auteur == auteur).ToList();
            for (int i = 0; i < recettes.Count; i++)
            {
                foreach (IngredientRecette ingr in recettes[i].Ingredients)
                {
                    ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
                }
            }
            return recettes;
        }

        public List<Recette> FindByTag(Models.Tag tag)
        {
            var builder = Builders<Recette>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrWhiteSpace(tag.Saison))
            {
                var SeasonFilter = builder.Eq(rec => rec.Tags.Saison, tag.Saison);
                filter &= SeasonFilter;
            }

            if (!string.IsNullOrWhiteSpace(tag.TypePlat))
            {
                var TypePlatFilter = builder.Eq(rec => rec.Tags.TypePlat, tag.TypePlat);
                filter &= TypePlatFilter;
            }

            if (tag.Difficulte!=0)
            {
                var DifficulteFilter = builder.Eq(rec => rec.Tags.Difficulte, tag.Difficulte);
                filter &= DifficulteFilter;
            }

            if (tag.Cout != 0)
            {
                var CoutFilter = builder.Eq(recette => recette.Tags.Cout, tag.Cout);
                filter &= CoutFilter;
            }
            
            List<Recette> recettes = this._recettes.Find(filter).ToList();

            for (int i = 0; i < recettes.Count; i++)
            {
                foreach (IngredientRecette ingr in recettes[i].Ingredients)
                {
                    ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
                }
            }
            return recettes;
        }

        public List<Recette> FindByTags(SearchedTag tags)
        {
            var builder = Builders<Recette>.Filter;
            var filter = builder.Empty;

            if (tags.Saison.Any())
            {
                var SeasonFilter = builder.In(rec => rec.Tags.Saison, tags.Saison);
                filter &= SeasonFilter;
            }

            if (tags.TypePlat.Any())
            {
                var TypePlatFilter = builder.In(rec => rec.Tags.TypePlat, tags.TypePlat);
                filter &= TypePlatFilter;
            }

            if (tags.Difficulte.Any())
            {
                var DifficulteFilter = builder.In(rec => rec.Tags.Difficulte, tags.Difficulte);
                filter &= DifficulteFilter;
            }

            if (tags.Cout.Any())
            {
                var CoutFilter = builder.In(recette => recette.Tags.Cout, tags.Cout);
                filter &= CoutFilter;
            }

            List<Recette> recettes = this._recettes.Find(filter).ToList();
            for (int i = 0; i < recettes.Count; i++)
            {
                foreach (IngredientRecette ingr in recettes[i].Ingredients)
                {
                    ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
                }
            }
            return recettes;
        }

        public List<Recette> FindByIngredient(string ingredient)
        {
            var filter = Builders<Recette>.Filter.ElemMatch(rec => rec.Ingredients, ingr => ingr.Id == ingredient);
            List<Recette> recettes = this._recettes.Find(filter).ToList();
            for (int i = 0; i < recettes.Count; i++)
            {
                foreach (IngredientRecette ingr in recettes[i].Ingredients)
                {
                    ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
                }
            }
            return recettes;
        }

        public List<Recette> FindByUstensile(string ustensile)
        {
            var filter = Builders<Recette>.Filter.AnyEq(rec => rec.Ustensiles, ustensile);

            List<Recette> recettes = this._recettes.Find(filter).ToList();
            for (int i = 0; i < recettes.Count; i++)
            {
                foreach (IngredientRecette ingr in recettes[i].Ingredients)
                {
                    ingr.Ingredient = this._ingredientRepository.FindById(ingr.Id);
                }
            }
            return recettes;
        }

            public Recette Create(Recette recette)
        {
            _recettes.InsertOne(recette);
            return recette;
        }

        public void Delete(string id)
        {
            _recettes.DeleteOne(rec => rec.Id == id);

        }

        public Recette Update(string id, Recette recette)
        {
            recette.Id = id;
            _recettes.ReplaceOne(rec => rec.Id == id, recette);
            return recette;
        }

        public List<Recette> RecettesCarrousel()
        {
            List<Recette> recettesCarrousel = this._recettes.Find(rec => true).Skip(10).Limit(3).ToList();

            return recettesCarrousel;
        }
    }
}
