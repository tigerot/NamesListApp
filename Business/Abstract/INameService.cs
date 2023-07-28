using Entities.Concrete;
using Core.Utilities.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface INameService
    {
        IDataResult<Names> GetById(int id);
        IDataResult<List<Names>> GetList();
        IResult Add(Names Name);

        IResult IncrementCount(Names Name);
        IResult Delete(Names name);
        IResult Update(Names Name);
    }
}
