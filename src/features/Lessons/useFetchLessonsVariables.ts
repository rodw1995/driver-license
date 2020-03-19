import { ModelSortDirection } from '../../API';
import useOwner from '../../hooks/useOwner';

export default () => {
  const owner = useOwner();

  return {
    owner,
    sortDirection: ModelSortDirection.DESC,
  };
};
