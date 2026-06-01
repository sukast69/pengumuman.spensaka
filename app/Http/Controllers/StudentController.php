<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenSpout\Reader\CSV\Reader as CsvReader;
use OpenSpout\Reader\XLSX\Reader as XlsxReader;

class StudentController extends Controller
{
    public function index()
    {
        $stats = Student::selectRaw("
            COUNT(*) as total,
            COUNT(CASE WHEN status_lulus = true THEN 1 END) as lulus,
            COUNT(CASE WHEN status_lulus = false THEN 1 END) as tidak_lulus,
            COUNT(CASE WHEN link_skl IS NOT NULL AND link_skl != '' THEN 1 END) as dengan_skl
        ")->first();

        $recent = Student::orderBy('created_at', 'desc')->limit(5)->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total' => $stats->total,
                'lulus' => $stats->lulus,
                'tidak_lulus' => $stats->tidak_lulus,
                'dengan_skl' => $stats->dengan_skl,
                'persentase_lulus' => $stats->total > 0 ? round(($stats->lulus / $stats->total) * 100, 1) : 0,
            ],
            'recent_students' => $recent,
        ]);
    }

    public function dataSiswa()
    {
        $students = Student::orderBy('created_at', 'desc')->paginate(50);

        return Inertia::render('admin/data-siswa', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/students/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nisn' => 'required|string|max:20|unique:students,nisn',
            'nama' => 'required|string|max:150',
            'ttl' => 'required|string|max:100',
            'status_lulus' => 'boolean',
            'link_skl' => 'nullable|string',
        ]);

        Student::create($validated);

        return redirect('/admin/dashboard')->with('success', 'Siswa berhasil ditambahkan.');
    }

    public function show($nisn)
    {
        $student = Student::where('nisn', $nisn)->firstOrFail();

        return Inertia::render('public/result', [
            'student' => $student,
        ]);
    }

    public function edit($id)
    {
        $student = Student::findOrFail($id);

        return Inertia::render('admin/students/edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'nisn' => 'required|string|max:20|unique:students,nisn,' . $id,
            'nama' => 'required|string|max:150',
            'ttl' => 'required|string|max:100',
            'status_lulus' => 'boolean',
            'link_skl' => 'nullable|string',
        ]);

        $student->update($validated);

        return redirect('/admin/dashboard')->with('success', 'Siswa berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return redirect('/admin/dashboard')->with('success', 'Siswa berhasil dihapus.');
    }

    public function importForm()
    {
        return Inertia::render('admin/students/import');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,xlsx|max:10240',
        ]);

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $path = $file->getPathname();

        $imported = 0;
        $updated = 0;

        $reader = $extension === 'csv' ? new CsvReader() : new XlsxReader();
        $reader->open($path);

        foreach ($reader->getSheetIterator() as $sheetIndex => $sheet) {
            if ($sheetIndex > 1) break;
            $isHeader = true;
            foreach ($sheet->getRowIterator() as $row) {
                if ($isHeader) {
                    $isHeader = false;
                    continue;
                }

                $values = $row->toArray();
                $nisn = trim((string) ($values[4] ?? ''));
                $nama = trim((string) ($values[1] ?? ''));
                $ttl = trim((string) ($values[2] ?? ''));
                $keterangan = trim((string) ($values[6] ?? ''));
                $link_skl = trim((string) ($values[8] ?? ''));

                if (empty($nisn) || empty($nama) || empty($ttl)) {
                    continue;
                }

                $data = [
                    'nama' => $nama,
                    'ttl' => $ttl,
                    'status_lulus' => strtoupper($keterangan) === 'LULUS',
                    'link_skl' => $link_skl ?: null,
                ];

                $existing = Student::where('nisn', $nisn)->first();
                if ($existing) {
                    $existing->update($data);
                    $updated++;
                } else {
                    $data['nisn'] = $nisn;
                    Student::create($data);
                    $imported++;
                }
            }
        }

        $reader->close();

        return redirect('/admin/dashboard')->with('success', "Import selesai. {$imported} data baru, {$updated} data diperbarui.");
    }

    public function batchDestroy(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:students,id',
        ]);

        $count = count($ids['ids']);
        Student::whereIn('id', $ids['ids'])->delete();

        return redirect()->back()->with('success', "{$count} data berhasil dihapus.");
    }

    public function search(Request $request)
    {
        $request->validate([
            'nisn' => 'required|string|max:20',
        ]);

        $student = Student::where('nisn', $request->nisn)->first();

        if (!$student) {
            $response = Inertia::render('errors/not-found')->toResponse($request);
            $response->setStatusCode(404);
            return $response;
        }

        return redirect()->route('result', ['nisn' => $student->nisn]);
    }
}
