using Business.Abstract;
using Business.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class NameManager : INameService
    {
        private INamesDao _nameDao;

        public NameManager(INamesDao nameDao)
        {
            _nameDao = nameDao;
        }
        public IResult Add(Names Name)
        {
            _nameDao.Add(Name);
            return new SuccessResult(Messages.NameAdded);
        }

        public IResult Delete(Names name)
        {
            _nameDao.Delete(name);
            return new SuccessResult(Messages.NameDeleted);
        }

        public IDataResult<Names> GetById(int id)
        {
            return new SuccessDataResult<Names>(_nameDao.Get(name => name.NameId == id));
        }

        public IDataResult<List<Names>> GetList()
        {
            return new SuccessDataResult<List<Names>>(_nameDao.GetList().ToList());
        }

        public IResult IncrementCount(Names Name)
        {
            _nameDao.IncrementCount(Name);
            return new SuccessResult(Messages.CountIncremented);
        }

        public IResult Update(Names name)
        {
            _nameDao.Update(name);
            return new SuccessResult(Messages.NameUpdated);
        }
    }
}