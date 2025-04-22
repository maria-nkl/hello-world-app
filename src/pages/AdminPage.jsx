import React, { useEffect, useMemo, useState } from 'react';
import { Container, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useAuth } from '../context/AuthContext';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../store/userApi';

const AdminPage = () => {
  const { user: currentUser } = useAuth();
  const { data: users = [], isLoading, isError, isFetching, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [columnOrder, setColumnOrder] = useState([]);
  const [sorting, setSorting] = useState([]);

  const handleDelete = async (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await deleteUser(userId).unwrap();
      } catch (err) {
        console.error('Ошибка удаления пользователя:', err);
      }
    }
  };

  const handleToggleBlock = async (userId, isCurrentlyActive) => {
    try {
      await updateUser({ id: userId, data: { isActive: !isCurrentlyActive } }).unwrap();
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
    }
  };

  const columns = useMemo(
    () => [
      { id: 'id', accessorKey: 'id', header: 'ID' },
      { id: 'email', accessorKey: 'email', header: 'Email' },
      { id: 'name', accessorKey: 'name', header: 'Имя' },
      { id: 'role', accessorKey: 'role', header: 'Роль' },
      {
        id: 'isActive',
        accessorKey: 'isActive',
        header: 'Статус',
        cell: ({ row }) => (
          <Badge
            bg={row.original.isActive ? 'success' : 'danger'}
            className="cursor-pointer"
            onClick={() =>
              row.original.id !== currentUser?.id &&
              handleToggleBlock(row.original.id, row.original.isActive)
            }
          >
            {row.original.isActive ? 'Активен' : 'Заблокирован'}
          </Badge>
        ),
      },
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Дата регистрации',
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Действия',
        cell: ({ row }) => (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
            disabled={row.original.id === currentUser?.id}
          >
            Удалить
          </Button>
        ),
      },
    ],
    [currentUser]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { columnOrder, sorting },
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

  if (currentUser?.role !== 'admin') {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Доступ запрещен. Требуются права администратора.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Панель администратора</h2>

      {isError && <Alert variant="danger">{error?.message || 'Ошибка загрузки'}</Alert>}

      <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <table className="table">
          <thead className="sticky-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Button onClick={refetch} disabled={isFetching}>
        {isFetching ? <Spinner size="sm" /> : 'Обновить данные'}
      </Button>

      <style jsx>{`
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 2;
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }
        .dark .sticky-header {
          background-color: #343a40;
          border-bottom-color: #495057;
        }
        .table-responsive {
          max-height: 500px;
          overflow-y: auto;
        }
        th {
          position: relative;
          z-index: 1;
        }
        th[draggable='true'] {
          cursor: grab;
        }
        th[draggable='true']:active {
          cursor: grabbing;
        }
      `}</style>
    </Container>
  );
};

export default AdminPage;
