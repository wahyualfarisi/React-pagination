import { pagination } from './hooks/usePagination';

describe('pagination', () => {
    it('should return empty array', () => {
      let results = pagination();
      expect(results).toBeUndefined();
    });

    it('should return [1,2,3,4]', () => {
      let results = pagination(7, 2, 1, 1);
      expect(results).toEqual([1,2,3,4])
    })
    it('should return [1]', () => {
      let results = pagination(2, 2, 1, 1);
      expect(results).toEqual([1])
    })

    it('should return [1,2,3,4,5, right]', () => {
      let results1 = pagination(14, 2, 1, 1);
      expect(results1).toEqual([1,2,3,4,5,'right'])

      let results2 = pagination(14, 2, 1, 2);
      expect(results2).toEqual([1,2,3,4,5,'right'])

      let results3 = pagination(14, 2, 1, 3);
      expect(results3).toEqual([1,2,3,4,5,'right'])
    })

    it('should return [left,2,3,4,5,6,right] on current page 4', () => {
      let results1 = pagination(14, 2, 1, 4);
      expect(results1).toEqual(['left',2,3,4,5,6,'right'])
    })

    it('should return [left,3,4,5,6,7] on current page 5', () => {
      let results1 = pagination(14, 2, 1, 5);
      expect(results1).toEqual(['left',3,4,5,6,7])
    })

    it('should return [left,3,4,5,6,7] on current page 6', () => {
      let results1 = pagination(14, 2, 1, 6);
      expect(results1).toEqual(['left',3,4,5,6,7])
    })

    it('should return [left,3,4,5,6,7] on current page 7', () => {
      let results1 = pagination(14, 2, 1, 7);
      expect(results1).toEqual(['left',3,4,5,6,7])
    })
});