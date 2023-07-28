using Business.Abstract;
using DataAccess.Concrete.EntityFramework.Contexts;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using static Azure.Core.HttpHeader;

namespace NamesListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NamesController : ControllerBase
    {
        private INameService _NameService;
        
        public NamesController(INameService nameService)
        {
            _NameService = nameService;
        }
        [HttpGet("getall")]
        public IActionResult GetList()
        {
            var result = _NameService.GetList();
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            var result = _NameService.GetById(id);
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        [HttpPost("add")]
        public IActionResult Add(Entities.Concrete.Names Name)
        {
            var result = _NameService.Add(Name);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        [HttpPut("update")]
        public IActionResult Update(Entities.Concrete.Names name)
        {
            var result = _NameService.Update(name);
            if (result.Success)
            {
                return Ok(result.Message);
            }

            return BadRequest(result.Message);
        }

        [HttpDelete("delete")]
        public IActionResult Delete(Entities.Concrete.Names name)
        {
            var result = _NameService.Delete(name);
            if (result.Success)
            {
                return Ok(result.Message);
            }

            return BadRequest(result.Message);
        }
        [HttpPut("incrementcount")]
        public IActionResult IncrementCount(Entities.Concrete.Names Name)
        {
            var result = _NameService.IncrementCount(Name);
            if (result.Success)
            {
                return Ok(result.Message);
            }

            return BadRequest(result.Message);
        }
    }
}