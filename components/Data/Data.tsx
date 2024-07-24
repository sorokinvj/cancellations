'use client';

import React, { Fragment, useState } from 'react';
import { IoIosPaper } from 'react-icons/io';
import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import * as Headless from '@headlessui/react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaFileCsv,
  FaFilter,
  FaPaperPlane,
  FaPencil,
  FaPlus,
} from 'react-icons/fa6';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { TbCaretUpDownFilled } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/fieldset';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Modal from '@/components/ui/Modal';
import { Radio } from '@/components/ui/radio';
import { refundDummyDataDefault } from '@/mocks/data';
import { FaCheckCircle } from 'react-icons/fa';

const Requests: React.FC = () => {
  // State declarations
  const [dateRangePickerValue, setDateRangePickerValue] =
    useState<DateRangePickerValue>({});
  const [isFilterDisplayed, setIsFilterDisplayed] = useState(false);
  const [isExportCsvShown, setIsExportCsvShown] = useState(false);
  const [editNotesId, setEditNotesId] = useState('');
  const [editNotesContent, setEditNotesContent] = useState('');
  const [editNotes, setEditNotes] = useState(false);
  const [sendReportModal, setSendReportModal] = useState(false);
  const [refundDummyData, setRefundDummyData] = useState(
    refundDummyDataDefault,
  );
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Component logic and JSX
  return (
    <>
      <div className="flex w-full">
        {/* Main View */}
        <div className="flex h-screen flex-1 flex-col overflow-hidden">
          {/* Row: Header */}
          {/* <div className="text-[20px] font-medium">{title}</div> */}
          <div className="flex h-[72px] flex-none items-center gap-2 border-b bg-white px-[20px]">
            {/* <div className="text-[24px] font-medium">{title}</div> */}
            <Menu as="div" className="relative inline-block text-left">
              <h1 className="truncate">Requests</h1>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-20 mt-2 w-72 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="cursor-pointer select-none py-1">
                    <a
                      className={clsx(
                        'flex bg-gray-100 px-4 py-2 text-sm text-gray-800',
                      )}
                    >
                      Refunds
                    </a>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Button
                color="white"
                disabled={!refundDummyData.some(el => el.isSelected)}
                className="whitespace-nowrap"
                onClick={() => {}}
              >
                <IoIosPaper />
                Report Selected
              </Button>
              <Button
                color="white"
                className="whitespace-nowrap"
                onClick={() => {}}
              >
                <FaFileCsv />
                Export CSV
              </Button>
              <DateRangePicker
                className="z-30 mx-auto max-w-sm"
                value={dateRangePickerValue}
                onValueChange={setDateRangePickerValue}
              />
              <Button
                color="white"
                onClick={() => {
                  setIsFilterDisplayed(prev => !prev);
                }}
              >
                <FaFilter />
                <span>Filters</span>
              </Button>
            </div>
          </div>
          {/* Row: Table */}
          <div className="relative flex-1 overflow-auto bg-gray-50 p-6 font-medium">
            <div className="flex gap-5">
              <div className="mb-10 flex-1 overflow-hidden rounded-lg border bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <Table wFull className="font-medium">
                    <TableHead>
                      <TableRow>
                        <TableHeader>
                          <Checkbox
                            color="blue"
                            checked={selectAllChecked}
                            onChange={checked => {
                              setSelectAllChecked(checked);
                              setRefundDummyData(prev => {
                                const newData = [...prev];

                                newData.forEach(el => {
                                  el.isSelected = checked;
                                });

                                return newData;
                              });
                            }}
                          />
                        </TableHeader>
                        <TableHeader>
                          ID
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Customer Name
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Agent Name
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Request Type
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Date Created
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Date Updated
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Date Completed
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Source
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Request Details
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Customer Email
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Account Number
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Last 4 CC Digits
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Successfully Resolved
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Save Offer
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Notes
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                        <TableHeader>
                          Report Status
                          <TbCaretUpDownFilled className="mx-1 inline-block shrink-0 text-zinc-200" />
                        </TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {refundDummyData.map((row, i) => (
                        <TableRow
                          key={row.id + i}
                          className="hover:bg-flair-50/30 active:bg-flair-50/60 select-none"
                        >
                          <TableCell>
                            <Checkbox
                              color="blue"
                              checked={row.isSelected}
                              onChange={checked => {
                                setRefundDummyData(prev => {
                                  const newData = [...prev];

                                  newData
                                    .filter(el => el.id === row.id)
                                    .forEach(el => {
                                      el.isSelected = checked;
                                    });

                                  return newData;
                                });
                              }}
                            />
                          </TableCell>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <img
                                src={'/faces/blank-profile-picture.png'}
                                className="mr-1 h-5 w-5 rounded-full border text-gray-600 shadow-sm"
                                aria-hidden="true"
                              />
                              {row.customerName}
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            <div className="flex items-center gap-1">
                              {getSmiley(request.customerEmotion)}
                              <Badge color={getColor(request.customerEmotion)}>
                                {request.customerEmotion}
                              </Badge>
                            </div>
                          </TableCell> */}
                          <TableCell>
                            <div className="flex items-center">
                              <img
                                src={'/faces/blank-profile-picture.png'}
                                className="mr-1 h-5 w-5 rounded-full border text-gray-600 shadow-sm"
                                aria-hidden="true"
                              />
                              {row.agentName}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge color={'sky'}>{row.requestType}</Badge>
                          </TableCell>

                          <TableCell>{row.dateCreated}</TableCell>
                          <TableCell>{row.dateUpdated}</TableCell>
                          <TableCell>{row.dateCompleted}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <img
                                src={
                                  '/images/refund-sources/' +
                                  row.source +
                                  '.png'
                                }
                                className="mr-1 h-5 w-5 rounded-full border text-gray-600 shadow-sm"
                                aria-hidden="true"
                              />
                              {row.source}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="line-clamp-1 w-96 truncate whitespace-normal">
                              {row.requestDetails}
                            </div>
                          </TableCell>
                          <TableCell>{row.customerEmail}</TableCell>
                          <TableCell>{row.accountNumber}</TableCell>
                          <TableCell>{row.last4CC}</TableCell>
                          <TableCell>
                            <Headless.Fieldset>
                              <Headless.RadioGroup
                                name="rating"
                                defaultValue={row.resolvedStatus ? 'Yes' : 'No'}
                                className="flex gap-6 sm:gap-8"
                              >
                                {['Yes', 'No'].map(rating => (
                                  <Headless.Field
                                    key={rating}
                                    className="flex items-center gap-2"
                                  >
                                    <Radio value={rating} color="blue" />
                                    <Headless.Label className="select-none text-base/6 sm:text-sm/6">
                                      {rating}
                                    </Headless.Label>
                                  </Headless.Field>
                                ))}
                              </Headless.RadioGroup>
                            </Headless.Fieldset>
                          </TableCell>
                          <TableCell>
                            <Field className="w-28">
                              <Select>
                                <option value="-">-</option>
                                <option value="25-off">25% Off</option>
                                <option value="50-off">50% Off</option>
                              </Select>
                            </Field>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className=""> {row.notes || '-'}</div>{' '}
                              <div
                                className="link flex items-center gap-1 text-xs text-gray-400 underline"
                                onClick={() => {
                                  setEditNotesId(row.id);
                                  setEditNotesContent(row.notes);
                                  setEditNotes(true);
                                }}
                              >
                                <FaPencil />
                                Edit
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              color="white"
                              onClick={() => {
                                setSendReportModal(true);
                              }}
                            >
                              <IoIosPaper /> Report
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          {/* Row Pagination */}
          <div className="flex h-12 shrink-0 items-center gap-2 border-t bg-gray-50 px-[20px] py-2 text-[12px]">
            <div className="flex-1" />
            <Button
              // disabled={!hasPreviousPage}
              color="white"
              className="w-28"
              onClick={() => {
                // previousPage()
              }}
            >
              <FaAngleLeft className="text-gray-500" /> Previous
            </Button>
            <span className="flex w-[100px] items-center justify-center gap-1">
              <div>Page</div>
              <strong>{1}</strong>
            </span>
            <Button
              // disabled={!hasNextPage}
              color="white"
              className="w-28"
              onClick={() => {
                // nextPage()
              }}
            >
              Next <FaAngleRight className="text-gray-500" />
            </Button>
            <div className="flex-1" />
          </div>
        </div>
        {/* Filter Side */}
        {isFilterDisplayed ? (
          <div className="my-[-1px] h-[calc(100vh+2px)] w-[500px] overflow-y-scroll border-l border-zinc-300 bg-gray-50">
            <div className="flex h-[32px] border-y border-zinc-300 bg-gray-50">
              <div className="flex h-full items-center border-r border-zinc-300 bg-white px-[8px]">
                <div className=" text-[14px] font-bold">Filters</div>
              </div>
            </div>
            <div className="border-b border-zinc-300 bg-white p-2">
              {/* Implement filters here */}

              <div className="flex">
                <div
                  className="border-flair-600 text-flair-600 flex h-[29px] w-[95px] cursor-pointer items-center rounded-[66px] border border-dashed bg-white px-2 text-[12px] hover:bg-gray-50 active:bg-gray-100"
                  onClick={() => {}}
                >
                  <FaPlus className="mr-1" />
                  Add
                </div>
                <div className="flex-1" />
                <Button className="h-[32px]" onClick={() => {}}>
                  <span className="flex items-center text-white">
                    Apply Filters
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Modal
        shown={isExportCsvShown}
        onClose={() => {
          setIsExportCsvShown(false);
        }}
        title="Your CSV is being exported"
      >
        <h3 className="mb-3 text-lg font-bold">Your CSV is being exported</h3>

        <div className="flex items-center justify-center">
          <FaPaperPlane className="text-flair-400 m-8 text-8xl" />
        </div>

        <div className="mb-5 flex items-center justify-center px-5 text-sm text-slate-700">
          You will receive an email shortly with a download link. After
          received, the CSV link is valid for 12 hours.
        </div>

        <div className="flex justify-center">
          <button
            className="flair-btn-secondary btn-sm w-40"
            onClick={() => {
              setIsExportCsvShown(false);
            }}
          >
            <span>Close</span>
          </button>
        </div>
      </Modal>

      {/* Edit Notes */}
      <Modal
        shown={editNotes}
        size="md"
        onClose={() => {
          // Clear modal
          setEditNotes(false);
        }}
        title="Edit Notes"
      >
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Edit Notes
            </h3>
          </div>
          <div className="mt-6">
            {/* Add here */}
            <form className="space-y-4">
              <div>
                <textarea
                  rows={4}
                  name="question"
                  id="question"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={editNotesContent}
                  onChange={ev => {
                    setEditNotesContent(ev.currentTarget.value);
                  }}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    // Save logic here
                    setEditNotes(false);

                    setRefundDummyData(prev => {
                      const newData = [...prev];

                      newData
                        .filter(el => el.id === editNotesId)
                        .forEach(el => {
                          el.notes = editNotesContent;
                        });

                      return newData;
                    });
                  }}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        shown={sendReportModal}
        size="sm"
        onClose={() => {
          // Clear modal
          setSendReportModal(false);
        }}
        title="Send Report"
      >
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Send Report
            </h3>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaCheckCircle className="text-8xl text-green-500" />
            <div className="text-sm font-medium">Report has been sent!</div>
            <Button
              color="white"
              onClick={() => {
                // Save logic here
                setSendReportModal(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Requests;
