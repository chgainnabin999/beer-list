import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../common/Button';
import Input from '../common/forms/Input';

import { useContext } from 'react';
import image from 'src/assets/my-beer-placeholder.png';
import { BeerContext } from 'src/context/Beer';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  genre: Yup.string().required('Genre is required'),
  description: Yup.string().required('Description is required'),
});

interface AddBeerFormProps {
  closeModal: () => void;
}

const AddBeerForm: React.FC<AddBeerFormProps> = (props) => {
  const context = useContext(BeerContext);
  const formik = useFormik({
    initialValues: {
      name: '',
      genre: '',
      description: '',
      imageURL: image,
    },
    validationSchema,
    onSubmit: (values) => {
      context?.createBeer(values);
      props.closeModal();
      toast.success('Added beer successfully!');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mx-auto mt-4 p-4">
      <div className="mb-4 ">
        <img
          className="w-20 h-40 object-contain border p-4"
          src={image}
        />
      </div>
      <div className="mb-4">
        <Input
          type="text"
          name="name"
          placeholder="Beer name*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={(formik.touched.name && formik.errors.name) || ''}
        />
      </div>
      <div className="mb-4">
        <Input
          type="text"
          name="genre"
          placeholder="Genre*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.genre}
          error={(formik.touched.genre && formik.errors.genre) || ''}
        />
      </div>
      <div className="mb-4">
        <Input
          isTextArea
          type="text"
          name="description"
          placeholder="Description*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          error={
            (formik.touched.description &&
              formik.errors.description) ||
            ''
          }
        />
      </div>

      <div className="flex justify-end">
        <div>
          <Button
            type="button"
            onClick={props.closeModal}
            className="bg-gray-100 hover:bg-gray-200 hover:text-gray-600 text-gray-500"
          >
            Cancel
          </Button>
        </div>

        <div className="ml-3">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
};

export default AddBeerForm;
