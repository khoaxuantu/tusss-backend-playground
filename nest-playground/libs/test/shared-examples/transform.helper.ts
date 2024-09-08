import { Constructor } from "../../types/common";
import { plainToInstance } from "class-transformer";

interface testArrParamsTransformProps<T> {
  cls: Constructor<T>;
  singleObj: any;
  expectedSingleObj: any;
  arrObj: any;
  expectedArrObj: any;
}

export function testArrParamsTransform<T>(props: testArrParamsTransformProps<T>) {
  describe('when single object', () => {
    it('should transform to array', () => {
      const obj = plainToInstance(props.cls, props.singleObj);
      expect(obj).toMatchObject(props.expectedSingleObj);
    });
  });

  describe('when array object', () => {
    it('should be array', () => {
      const obj = plainToInstance(props.cls, props.arrObj);
      expect(obj).toMatchObject(props.expectedArrObj);
    });
  });
}
