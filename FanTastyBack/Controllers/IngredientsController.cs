﻿using Microsoft.AspNetCore.Mvc;

namespace FanTastyBack.Controllers
{
    public class IngredientsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}