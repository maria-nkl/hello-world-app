import React, { useEffect, useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFeedback } from '../../store/slices/feedbackSlice';

const FeedbackTable = ({ feedback, loading, isDark }) => {
  const dispatch = useDispatch();
  const [columnOrder, setColumnOrder] = useState([]);
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        id: 'author',
        header: 'Автор',
        accessorKey: 'author',
        size: 150, // Фиксированная ширина для колонки "Автор"
      },
      {
        id: 'authorEmail',
        header: 'Email',
        accessorKey: 'authorEmail',
        size: 200, // Фиксированная ширина для колонки "Email"
      },
      {
        id: 'text',
        header: 'Отзыв',
        accessorKey: 'text',
        size: 400, // Фиксированная ширина для колонки "Отзыв"
        cell: ({ getValue }) => <div className="feedback-cell">{getValue()}</div>,
      },
      {
        id: 'timestamp',
        header: 'Дата',
        accessorKey: 'timestamp',
        size: 120, // Фиксированная ширина для колонки "Дата"
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Действия',
        size: 120, // Фиксированная ширина для колонки "Действия"
        cell: ({ row }) => (
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(removeFeedback(row.original.id))}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" animation="border" /> : 'Удалить'}
          </Button>
        ),
      },
    ],
    [dispatch, loading]
  );

  const table = useReactTable({
    data: feedback,
    columns,
    state: {
      columnOrder,
      sorting,
    },
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (columns.length && columnOrder.length === 0) {
      setColumnOrder(columns.map((col) => col.id));
    }
  }, [columns, columnOrder]);

  return (
    <div className={`table-container ${isDark ? 'dark' : ''}`}>
      <div className="table">
        {/* Фиксированный заголовок */}
        <div className="thead sticky-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <div className="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => (
                <div
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ 
                    width: header.getSize(),
                    minWidth: header.getSize(),
                    maxWidth: header.getSize()
                  }}
                  className={`th ${headerIndex === 0 ? 'sticky-column' : ''}`}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('colId', header.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const draggedColId = e.dataTransfer.getData('colId');
                    if (draggedColId && draggedColId !== header.id) {
                      const newOrder = [...columnOrder];
                      const fromIndex = newOrder.indexOf(draggedColId);
                      const toIndex = newOrder.indexOf(header.id);
                      newOrder.splice(fromIndex, 1);
                      newOrder.splice(toIndex, 0, draggedColId);
                      setColumnOrder(newOrder);
                    }
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="d-flex align-items-center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span className="ms-2">
                      {{
                        asc: '↑',
                        desc: '↓',
                      }[header.column.getIsSorted()] ?? '↕'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Тело таблицы */}
        <div className="tbody">
          {loading && feedback.length === 0 ? (
            <div className="tr">
              <div className="td" style={{ width: '100%' }}>
                <Spinner animation="border" />
              </div>
            </div>
          ) : (
            table.getRowModel().rows.map((row) => (
              <div className="tr" key={row.id}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <div
                    key={cell.id}
                    className={`td ${cellIndex === 0 ? 'sticky-column' : ''}`}
                    style={{ 
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                      left: cellIndex === 0 ? 0 : undefined
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .table-container {
          border: 1px solid #dee2e6;
          border-radius: 4px;
          overflow: hidden;
        }
        .table-container.dark {
          border-color: #495057;
        }
        .table {
          display: flex;
          flex-direction: column;
          width: 100%;
          overflow-x: auto;
        }
        .thead {
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
          position: sticky;
          top: 0;
          z-index: 3;
        }
        .dark .thead {
          background-color: #343a40;
        }
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 3;
          background: ${isDark ? '#343a40' : '#f8f9fa'};
        }
        .tr {
          display: flex;
          width: fit-content;
          min-width: 100%;
        }
        .th,
        .td {
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
          border-right: 1px solid #dee2e6;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .td:last-child,
        .th:last-child {
          border-right: none;
        }
        .dark .th,
        .dark .td {
          border-bottom-color: #495057;
          border-right-color: #495057;
        }
        .sticky-column {
          position: sticky;
          left: 0;
          z-index: 2;
          background: ${isDark ? '#343a40' : '#f8f9fa'};
        }
        .th {
          font-weight: 600;
          background-color: inherit;
          cursor: pointer;
          user-select: none;
        }
        .th:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .dark .th:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
        .th[draggable="true"] {
          cursor: grab;
        }
        .th[draggable="true"]:active {
          cursor: grabbing;
        }
        .tbody {
          max-height: 500px;
          overflow-y: auto;
        }
        .feedback-cell {
          white-space: normal;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        @media (max-width: 768px) {
          .table-container {
            overflow-x: auto;
            position: relative;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackTable;