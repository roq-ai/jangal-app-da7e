import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getTransactionHistoryById, updateTransactionHistoryById } from 'apiSdk/transaction-histories';
import { transactionHistoryValidationSchema } from 'validationSchema/transaction-histories';
import { TransactionHistoryInterface } from 'interfaces/transaction-history';
import { AccountInterface } from 'interfaces/account';
import { getAccounts } from 'apiSdk/accounts';

function TransactionHistoryEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<TransactionHistoryInterface>(
    () => (id ? `/transaction-histories/${id}` : null),
    () => getTransactionHistoryById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TransactionHistoryInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTransactionHistoryById(id, values);
      mutate(updated);
      resetForm();
      router.push('/transaction-histories');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<TransactionHistoryInterface>({
    initialValues: data,
    validationSchema: transactionHistoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Transaction Histories',
              link: '/transaction-histories',
            },
            {
              label: 'Update Transaction History',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Transaction History
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Transaction Amount"
            formControlProps={{
              id: 'transaction_amount',
              isInvalid: !!formik.errors?.transaction_amount,
            }}
            name="transaction_amount"
            error={formik.errors?.transaction_amount}
            value={formik.values?.transaction_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('transaction_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.transaction_status}
            label={'Transaction Status'}
            props={{
              name: 'transaction_status',
              placeholder: 'Transaction Status',
              value: formik.values?.transaction_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<AccountInterface>
            formik={formik}
            name={'sender_account_number'}
            label={'Select Account'}
            placeholder={'Select Account'}
            fetcher={getAccounts}
            labelField={'account_number'}
          />
          <AsyncSelect<AccountInterface>
            formik={formik}
            name={'reciever_account_number'}
            label={'Select Account'}
            placeholder={'Select Account'}
            fetcher={getAccounts}
            labelField={'account_number'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/transaction-histories')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'transaction_history',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TransactionHistoryEditPage);
